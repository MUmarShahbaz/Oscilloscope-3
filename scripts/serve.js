import { create_child, quit_all } from './sub_process.cjs';
import { existsSync } from 'fs';

let children = [];
process.on('SIGINT', () => quit_all(children));

create_child('Jekyll', 'bundle exec jekyll serve', undefined, 10)
        .then((child) => { children.push(child); })
        .catch(e => console.log(e));

const tailwind = () => {create_child('Tailwind', 'npx @tailwindcss/cli -i ./assets/css/tailwind.css -o ./_site/assets/css/tailwind.css', undefined , 10)
        .then((child) => { children.push(child); })
        .catch(e => console.log(e));}

setInterval(async () => { if (!existsSync('./_site/assets/css/tailwind.css')) {tailwind()} }, 1000);