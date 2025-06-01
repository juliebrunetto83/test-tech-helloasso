<template>
  <NuxtRouteAnnouncer/>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<style>
body {
  margin: 0 2rem;
}

button {
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background-color: #262626;
  color: white;
  cursor: pointer;
  outline-offset: 4px;

  &:hover {
    background-color: #000000;
  }
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}

input[type="checkbox"], input[type="checkbox"] + label {
  cursor: pointer;
}

label, legend {
  font-weight: 600;
}

input[type="text"] {
  display: block;
  min-width: 40ch;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #8d8d8d;
  border-radius: 8px;
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & li {
    height: fit-content;
    padding: 0.75rem;
    list-style: none;
    border: 1px solid #8d8d8d;
    border-radius: 8px;
  }
}

h1 {
  font-size: 1.75rem;
}

h2 {
  font-size: 1.3rem;
  margin: 0;
}

fieldset {
  border: 1px solid #8d8d8d;
  border-radius: 8px;
  padding: 0.75rem;
}
</style>
