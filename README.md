<div align="center">
<a href="https://github.com/eddiejibson/iru"><img alt="iru" src="https://github.com/eddiejibson/iru/raw/master/icon.png"></a>
<br>
<br>
<p><i>Smartly generate a post-based website from Markdown files - no more messy static files. </i></p>
<a href="https://eddiejibson.github.io/iru/example">View The Live Example</a>
</div>

## Setup

Setup is really easy with iru. You can copy and paste this example and will only need to change the title and `window.$iru` object.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Example</title>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/iru/css/dark.css">
</head>
<body>
    <script>
        window.$iru = {
            name: "Posts", //Title for the site
            posts: ["example"], //The name(s) of all your .md files
            hash: true //Should the url for posts utilize a hash 
            //e.g yourdomain.com/#post or not - becoming yourdomain.com/post.
        }
    </script>
    <script src="https://cdn.jsdelivr.net/npm/iru@1.0.5/build/iru.min.js"></script>
</body>
</html>

```

## Example
You can view the example live [here](https://eddiejibson.github.io/iru/example). Alternatively, you may view all the code for yourself in the `example/` directory.

## Options

Defined below are the various keys you may set to customize iru within the `window.$iru` object.

| Key           | Default     | Description  |
| ------------- |-------------| ------------ |
| name          | `"Posts"`   | The header/title of the posts page. |
| posts         | `false`     |   An array containing all the names of your .md files with the post content in them - without the .md extension. |
| hash          | `true`      | Should the url for posts utilize a hash e.g `yourdomain.com/#post` or not - becoming `yourdomain.com/post`. If you choose not to use a hash because it looks nicer, you'll need to configure your web server correctly. |
| root          | `"/"`       | What is the root path (minus the domain and directory) of your posts site? If it's the index, leave it at `/`. However, if for example it's in a HTML file named posts, set it to `"/posts.html"`. |
| preview_length | `256`      | What is the maximum length of a post preview? |

## Roadmap
- [ ] Render post list on the server - for better SEO.
