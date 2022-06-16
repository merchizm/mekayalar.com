<script>
  import WelcomeSection from "../component/WelcomeSection.svelte";
  import SocialSection from "../component/SocialSection.svelte";
</script>

<WelcomeSection>
  <h1 slot="title">Hi, I'm Enes &lt;merchizm&gt; Kayalar</h1>
  <p slot="paragraph">
    little about me
  </p>
</WelcomeSection>
<SocialSection/>