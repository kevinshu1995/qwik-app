import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, routeAction$, Form } from "@builder.io/qwik-city";

export const useDadJoke = routeLoader$(async () => {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
    });
    return (await response.json()) as {
        id: string;
        status: number;
        joke: string;
    };
});

export const useJokeVoteAction = routeAction$(props => {
    // Leave it as an exercise for the reader to implement this.
    console.log("VOTE", props);
});

const VoteBtn = component$((props: { value: string }) => {
    return (
        <button class="border-solid border border-gray-800 py-2 px-4 hover:bg-gray-700" name="vote" value={props.value}>
            <Slot />
        </button>
    );
});

export default component$(() => {
    // Calling our `useDadJoke` hook, will return a reactive signal to the loaded data.
    const dadJokeSignal = useDadJoke();
    const favoriteJokeAction = useJokeVoteAction();
    return (
        <section class="section bright container">
            <p class="font-bold text-5xl mb-6">{dadJokeSignal.value.joke}</p>

            <Form action={favoriteJokeAction}>
                <input type="hidden" name="jokeID" value={dadJokeSignal.value.id} />
                <div class="space-x-2">
                    <VoteBtn value="up">👍</VoteBtn>
                    <VoteBtn value="down">👎</VoteBtn>
                </div>
            </Form>
        </section>
    );
});

