module.exports = {
  content: [
    "./apps/**/templates/**/*.html",
    "./apps/**/templatetags/*.py",
    "./templates/**/**/*.html",
    "./templates/*.html",
    "./{{cookiecutter.project_slug}}/urls.py"
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
