<template>
    <article class="account-preview grid skeleton-loader">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-img"></div>
        <section class="actions-container grid grid-dir-cols">
            <div class="skeleton skeleton-button"></div>
            <div class="skeleton skeleton-button"></div>
        </section>
    </article>

</template>


<script setup></script>

<style scoped>
.account-preview {
    position: relative;
    grid-template-columns: 0rem auto 0rem;
    outline: 1px solid #ccc;
    padding: 1rem;
}

.account-preview>* {
    grid-column: 2;
}

.account-preview img {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: min-content;
}

.actions-container {
    /* margin-block-end: 1rem; */
    justify-content: end;
    gap: 2rem;
}

.actions-container button,
.actions-container a {
    padding: 0.5rem 1rem;
}

/* Skeleton Loader Styles */
.skeleton-loader .skeleton {
    background: #ccc;
    border-radius: 4px;
    animation: shimmer 1.5s infinite linear;
}

.skeleton-title {
    width: 60%;
    height: 1.5rem;
    margin-bottom: 1rem;
}

.skeleton-text {
    width: 60%;
    height: 1rem;
    margin-bottom: 1rem;
}

.skeleton-img {
    width: 100px;
    height: 100px;
    position: absolute;
    right: 1rem;
    top: 1rem;
}

.skeleton-button {
    width: 100px;
    height: 2rem;
}

@keyframes shimmer {
    0% {
        background-position: -1000px 0;
    }

    100% {
        background-position: 1000px 0;
    }
}
</style>