<script>
    import NavLink from './NavigationLink.svelte';
    import {SITE_TITLE, YOUR_TITLE} from "$lib/siteConfig";

    let navLinks = [
        {
            url: '/',
            name: 'Giriş'
        },
        {
            url: '/blog',
            name: 'Notlarım'
        },
        {
            url: '/portfolio',
            name: 'Projelerim'
        },
        {
            url: '/gallery',
            name: 'Galeri'
        },
        {
            url: '/bookmarks',
            name: 'Yer İmleri'
        }
    ];

    const imageName = function () {
        let datetime = new Date(new Date().toLocaleString("en-US", {timeZone: "europe/Istanbul"}));
        switch (datetime.getHours()) {
            case 8:
            case 9:
                return 'ea352eec188313b0e1f3c845b59de229.png';
            case 10:
            case 11:
                return '17cd863577187cc7ff2484cb51b74f74.png';
            case 12:
            case 13:
                return '1138d33b964f817a2b2aef248fd75635.png';
            case 14:
            case 15:
                return 'ac3f33dd0ea6d114f9eae3065b164360.png';
            case 16:
            case 17:
                return 'b2b2443a57669beb59298cc87bcfc418.png';
            case 18:
            case 19:
                return 'e2d438d2ec8ef9e19dc417e4b558bdda.png';
            case 20:
            case 21:
                return 'ea352eec188313b0e1f3c845b59de229.png';
            case 22:
            case 23:
                return 'dfcef4a9f9a954ce98ad33909f35aa8a.png';
            case 24:
            case 1:
            case 2:
                return '8311ae278de83456901520ab454dea72.png';
            case 3:
                return 'b8ae389ec519423fc3782e5e9ddb81f5.png';
            case 4:
                return 'd0469d2ee1b260d134eaf8dc2ef0cbbe.png';
            case 5:
                return 'b8ae389ec519423fc3782e5e9ddb81f5.png';
            case 6:
                return 'd0469d2ee1b260d134eaf8dc2ef0cbbe.png';
            case 7:
                return 'e9f2754ca22e94ab8bc7c13c9b1bff34.png';
        }
    }
</script>

<header>
    <div>
        <img src="/avatars/{imageName()}" alt="Hey!">
        <span>{SITE_TITLE}</span>
        <span>{YOUR_TITLE}</span>
    </div>
    <nav>
        <ul>
            {#each navLinks as {url, name}}
                <NavLink href="{url}">{name}</NavLink>
            {/each}
        </ul>
    </nav>
</header>

<style lang="scss">
  header {
    margin-top: 75px;
    height: 83vh;
    width: 23%;
    position: relative;

    div {
      padding: 10px 15px;
      display: flex;
      align-items: center;
      justify-content: start;


      img {
        width: 70px;
        border-radius: 50%;
      }

      %spans {
        margin-left: 15px;
        margin-top: 8px;
      }

      span:first-of-type {
        @extend %spans;
        font-size: 1.2rem;
        font-weight: bold;
      }

      span:last-of-type {
        @extend %spans;
        font-size: .8rem;
        margin: 5px 0;
      }
    }

    nav {
      margin-top: 25px;
      margin-left: 16px;

      ul{
        list-style-type: none;
      }
    }

    //TODO: Rebuild signature box.
  }
</style>