<script>
    import {Data} from '../../lib';
    import {MoodRating} from '../../Components';
    import * as Dialog from "$ui/components/ui/dialog";
    import * as Card from "$ui/components/ui/card";
    import { Jumper } from 'svelte-loading-spinners';

    let input, modalOpen = false, modalLoaded = false;
    let inputFocussed = false;

    // Modal display data
    let summary, overallMood, potentialIssues, feedback;

    $: if (modalOpen === false) {
        modalLoaded = false;

        summary = "";
        overallMood = 0;
        potentialIssues = "";
        feedback = "";
        if (input) input.value = "";
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (input.value.length < 3) {
            alert("Please enter your current mood or status and try again.");
            return;
        }

        modalOpen = true;

        try {
            const data = await Data.createUserAnalysis(input.value);

            summary = data.summary;
            overallMood = data.overall_mood;
            potentialIssues = data.potential_issues;
            feedback = data.feedback;

            // Display the modal
            modalLoaded = true;
        } catch (e) {
            console.error(e);
            alert("Could not generate analysis due to an error. Please try again.");

            modalOpen = false;
        }
    };
</script>

<form on:submit={onSubmit} class="feeling-bar {inputFocussed ? 'active' : ''}">
    <div class="icon"></div>
    <input on:focus={() => inputFocussed = true} on:blur={() => inputFocussed = false} bind:this={input} type="text" placeholder="How are you feeling right now?" />
</form>

<Dialog.Root bind:open={modalOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title class="font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">Your Analysis</Dialog.Title>
            {#if modalLoaded === true}
                <Dialog.Description class="text-sm font-medium">
                    {summary}
                </Dialog.Description>
            {/if}
        </Dialog.Header>
        
        {#if modalLoaded === true}
            <div class="flex items-center pt-4">
                <Card.Root class="overall-mood font-medium flex-1">
                    <Card.Content class="text-center p-4">
                        <MoodRating mood={overallMood} />
                    </Card.Content>
                </Card.Root>
                <Card.Root class="font-medium flex-1">
                    {#if potentialIssues === false || potentialIssues === ''}
                        <Card.Header class="p-0">
                            <Card.Title class="text-base">No issues detected</Card.Title>
                            <Card.Description>That's great!</Card.Description>
                        </Card.Header>
                    {:else}
                        <Card.Header class="p-0">
                            <Card.Title class="text-base">Potential Issues</Card.Title>
                            <Card.Description>{potentialIssues}</Card.Description>
                        </Card.Header>
                    {/if}
                </Card.Root>
            </div>

            <Card.Root class="font-medium pb-0">
                <Card.Header class="p-4 pb-0">
                    <Card.Title class="text-base">Feedback</Card.Title>
                    <Card.Description>
                        {feedback}
                    </Card.Description>
                </Card.Header>
                <Card.Content class="text-sm p-4"></Card.Content>
            </Card.Root>
        {:else}
            <div class="flex justify-center items-center m-4">
                <Jumper size="70" color="#b7a3e5" unit="px" duration="1.5s" />
            </div>
        {/if}
    </Dialog.Content>
</Dialog.Root>