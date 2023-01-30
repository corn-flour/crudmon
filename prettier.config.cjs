/** @type {import("prettier").Config} */
module.exports = {
    semi: false,
    tabWidth: 4,
    plugins: [require.resolve("prettier-plugin-tailwindcss")],
}
