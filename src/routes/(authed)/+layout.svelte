
<script lang="ts">
    
    import { page } from "$app/stores";
    import { Enviroment } from "$lib/lib";

    const user = $page.data.user;
    const isAdmin = user.c03;
    

</script>


<body>
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container px-4 px-lg-5">
            <a class="navbar-brand" href="{Enviroment.ROOT_URL+Enviroment.DEFAULT_AUTH_PAGE}">Start Bootstrap</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                    <li class="nav-item dropdown">
                        <a class="nav-link"  href="{Enviroment.ROOT_URL+Enviroment.DEFAULT_AUTH_PAGE}" role="button">Browse</a>
                    </li>
                    {#if isAdmin}
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Articles</a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="{Enviroment.ROOT_URL}/artall">All Articles</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#!">Add article</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Models</a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#!">All Models</a></li>
                            <li><a class="dropdown-item" href="{Enviroment.ROOT_URL}/models/unverified">Unverified models</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#!">Add model</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="addDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Users</a>
                        <ul class="dropdown-menu" aria-labelledby="addDropdown">
                            <li><a class="dropdown-item" href="#!">All Users</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#!">Add user</a></li>
                        </ul>
                    </li>
                    {/if}
                </ul>
                <div class="d-flex me-2">
                    <a class="btn btn-outline-dark" href="{Enviroment.ROOT_URL}/mymodels">
                        <i class="bi bi-grid-3x3-gap"></i>
                        My models
                    </a>
                </div>
                <form action="/logout" method="POST">
                    <button class="btn btn-primary" type="submit">Log out</button>
                </form>
            </div>
        </div>
    </nav>
    <slot/>
    <!-- Footer-->
    <footer class="py-5 bg-dark">
        <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
    </footer>
</body>
