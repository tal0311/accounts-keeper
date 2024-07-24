<template>

<section class="home-view grid">
    <RouterLink to="/account">
        <section>
            <h2>Handle all your account in one place</h2>
            <p>Add, Edit, and view all your accounts. Keep them safe and secure</p>
            
        </section>
    </RouterLink>
</section>
</template>

<script setup>

</script>

<style scoped>

.home-view{
    /* background-color: red; */
    height: calc(100vh - 5rem);
    place-items: center;

    a{


        section{
            outline: 1px solid var(--clr1);
            border-radius: var(--br);
            display: grid;
            gap: 2rem;
            /* background-color: aqua; */
            padding: 3rem 1rem;
        }
    }

}
</style>