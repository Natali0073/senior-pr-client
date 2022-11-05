export const loadScript = (url: string) => {
  let node = document.createElement('script');
  node.src = url;
  node.type = 'text/javascript';
  node.async = true;
  document.getElementsByTagName('head')[0].appendChild(node);
}