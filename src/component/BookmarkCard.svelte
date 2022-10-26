<script>
    export let link;
    export let title;
    export let created;
    export let domain;
</script>

<div>
    <h3><a href="{link}">{title}</a></h3>
    <p>{domain} - {created}</p>
</div>