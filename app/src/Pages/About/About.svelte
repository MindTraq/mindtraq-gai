<script>
    import * as Card from "$ui/components/ui/card";
    import {onMount} from 'svelte';
    import {Sidebar, Header, FeelingBar} from '../../Components';

    onMount(() => {
        document.title = "About — MindTraq"
    });
</script>

<Header />

<div class="body about">
    <Sidebar />

    <div class="content sb">
        <h1 class="heading">About</h1>

        <div class="font-medium">
            MindTraq is our go at solving Problem 20 of Gen AI Exchange Hackathon by Google: 
            Gemini-Enhanced AI for Mental Health & Emotional Support.
            <br /><br />
            Developed by Team MindTraq, consisting of:
            <ul class="list-disc mx-4">
                <li><b>Sayan Jyoti Das</b> (CSE '27)</li>
                <li><b>Shivam Kumar</b> (CE '26)</li>
                <li><b>Roma Ghosh</b> (EE '26')</li>
                <li><b>Rohit Kumar</b> (CSE '26)</li>
            </ul>
        </div>
    </div>
</div>

<FeelingBar />