<script>
    import langColors from '$lib/langColors.json';
    import BookSvg from "./svg/BookSvg.svelte";
    import StarSvg from "./svg/StarSvg.svelte";
    import ForkSvg from "./svg/ForkSvg.svelte";

    export let repoName, repoDesc, repoStars, repoForks, repoLink, repoMainLanguage;
</script>

<li>
    <div class="title">
        <a href={repoLink}>
            <BookSvg/> {repoName}
        </a>
    </div>
    <p>{repoDesc ?? ''}</p>
    <div class="footer">
        <span><div class="lang_color" style="background-color:{repoMainLanguage !== null ? langColors[repoMainLanguage]['color'] : langColors['Markdown']['color']}"></div> {repoMainLanguage ?? 'Markdown'}</span>
        <span><StarSvg/> {repoStars}</span>
        <span><ForkSvg/> {repoForks}</span>
    </div>
</li>

<style lang="scss">
  li{
    max-width: 53vw;
    padding: 17px;
    background-color: var(--repository-card-bg);
    border-radius: 15px;
    &:hover{
      background-color: var(--repository-card-bg-hover);
    }
    .title{
      a{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        font-size:1.3em;
        font-weight: bold;
        text-decoration: none;
        color: var(--color);
      }
    }
    .lang_color {
      width: 0.75em;
      height: 0.75em;
      border-radius: 50%;
      background-color: var(--light-color);
      display: inline-block;
      filter: brightness(98%);
      margin-right: 5px;
    }
    p{
      padding-top: 1px;
      padding-bottom: 1px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

    }
    .footer{
      display: flex;
      align-items: center;
      box-sizing: border-box;
      font-size: 1.1em;
      column-gap:1em;
      span {
        display: flex;
        align-items: center;
        box-sizing: border-box;
      }
    }
  }
</style>
