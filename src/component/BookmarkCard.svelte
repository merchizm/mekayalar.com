<script>
    import {formatDistanceToNowStrict, parseISO} from "date-fns";
    import tr from "date-fns/locale/tr/index";

    export let created,domain,title,link;
</script>

<div>
    <p><a href="{link}" target="_blank" referrerpolicy="no-referrer" rel="nofollow">{title}</a></p>
    <span><b>{domain}</b> — {formatDistanceToNowStrict(parseISO(created), {
        addSuffix: true,
        locale: tr,
    })}</span>
</div>

<style lang="scss">
    div {
      padding-bottom: 10px;
      padding-top:10px;
      p {
        a {
          color: var(--color);
          text-decoration: none;
          &:hover{
            color: var(--light-color);
            filter: brightness(70%);
          }
          &:visited{
            color: var(--color);
            filter: brightness(70%);
          }

        }
        padding-top: 0.2em;
        padding-bottom: 0.1em;
        font-size: 1.2em;
      }
      span{
        font-size:1em;
        color: var(--color);
        filter: brightness(95%);
      }
    }
</style>