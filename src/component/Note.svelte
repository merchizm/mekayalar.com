<script>
    import {format, formatDistance} from "date-fns";
    import tr from "date-fns/locale/tr/index";
    export let href, title, date, category;
</script>

<a href="{href}">
    <div>
        <h2>
            {title}  <small>{category}</small>
        </h2>
        <span>
            {formatDistance(new Date(date), new Date(), { addSuffix: true, locale: tr })} · {format(new Date(date), 'd MMMM, yyyy', { locale: tr })}
        </span>
    </div>
</a>

<style lang="scss">
  a {
    text-decoration: none;
    div {
      margin: 40px 0;

      h2 {
        font-size: 1.2em;
        color: var(--color);
        margin-bottom: 5px;
        small {
            font-size: 0.7em;
            color: var(--light-color);
        }
      }

      span {
        font-size: .9em;
        color: var(--light-color);
      }
    }
  }

</style>