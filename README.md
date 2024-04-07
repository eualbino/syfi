<h1>SYFI</h1>
<img src="/frontend/public/login-image.png">
<img src="/frontend/public/register-image.png">
<img src="/frontend/public/list-buy-image.png">
<br/>
<br/>
<h1>About this project</h1>
<h3>This site talks about:</h3>
<p>SYFI is website for add itens in buy list, is very easy, you need to create your account in register, before login in your account and insert products to the list.</p>
<br/>
<h1>Why?</h1>
<p>This project created for my portfolio, this website very important for me, but, as it is a first project in which, create backend and frontend.
</p>
<p>Email-me: lucas.g.apostolo@gmail.com</p>
<a href="http://www.linkedin.com/in/lucas-gonçalves-922b7b272">LinkedIn</a>
<br/>
<br/>
<h1>Installers</h1>
<p>For run this project local, you need Node.js and MySQL.</p>
<p>Installer version 20: <a href="https://nodejs.org/en/download/current">Node.js</a></p>
<p>Installer MySQL: <a href="https://dev.mysql.com/downloads/installer/">MySQL</a></p>
<br/>
<h1>Funcionalities</h1>
<p><li/>Organize your buy list for optimize time and don't have the chance to lose list, is very practical!</p>
<p><li/>List</p>
<ul style="list-style-type:circle;">
  <li>Search products insets in your list.</li>
  <li>Insert products.</li>
</ul>
<p>Products</p>
<ul style="list-style-type:circle;">
  <li>Product status when purchased or not purchased</li>
  <li>Edit product name and delete product in list</li>
</ul>
<br/>
<h1>Getting Started</h1>
<h3>Installing</h3>
<h4>Clone this repository</h4>

```shell
$ git clone https://github.com/eualbino/lista-compra.git
```

#

### Installing backend:

```shell
$ cd backend
$ npm install
```

<strong>Create arquive .env</strong>

```
DATABASE_URL="file:./dev.db"
PORT=8080
CORS=http://localhost:3000
```

<strong>Generate migrations</strong>

```shell
$ npx prisma migrate dev
```

<strong>Run project</strong>

```shell
$ npm run dev
```

#

### Installing frontend:

```shell
$ cd frontend

$ npm install
```

<strong>Create arquive .env.local</strong>

```
NEXT_PUBLIC_BASE_URL="http://localhost:8080"
```

<strong>Run project</strong>

```shell
$ npm run dev
```

#

# Built with

### Backend

<li><a href="https://www.prisma.io/">Prisma ORM</a> - Generate databases.</li>
<li><a href="https://expressjs.com/">Express</a> - Web framework for Node.js.</li>
<hr>
<h3>Frontend</h3>
<li><a href="https://nextjs.org/">Next.js</a> - 
The React Framework for the Web</li>
<li><a href="https://ui.shadcn.com/">Shadcn.ui</a> - Component library.</li>
<li><a href="https://tailwindcss.com/">Tailwind.css</a> - CSS framework.</li>
<li><a href="https://axios-http.com/">Axios</a> - HTTP Client.</li>
<li><a href="https://tanstack.com/">TanStack Query</a> - Asynchronous state management.</li>
