const markdownInput=document.getElementById('markdown-input')
const htmlOutput=document.getElementById('html-output')
const htmlPreview=document.getElementById('preview')

function convertMarkdown(){
  let inputStr=markdownInput.value
  inputStr = inputStr.replaceAll(/^(#{1,6}) (.*)/mg, (_, hashes, text) => 
  `<h${hashes.length}>${text}</h${hashes.length}>`)
  inputStr=inputStr.replaceAll(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
  inputStr=inputStr.replaceAll(/__(.*?)__/g,'<strong>$1</strong>')
  inputStr=inputStr.replaceAll(/\*(.*?)\*/g,'<em>$1</em>')
  inputStr=inputStr.replaceAll(/_(.*?)_/g,'<em>$1</em>')
  inputStr=inputStr.replaceAll(/!\[(.*?)\]\((.*?)\)/g,'<img src="$2" alt="$1">')
  inputStr=inputStr.replaceAll(/\[(.*?)\]\((.*?)\)/g,'<a href="$2">$1</a>')
  inputStr=inputStr.replaceAll(/^\s*> (.{0,})/mg,'<blockquote>$1</blockquote>')
  inputStr=inputStr.replaceAll(/~~(.*?)~~/g,'<del>$1</del>')
  inputStr=inputStr.replaceAll(/`(.*?)`/g,'<code>$1</code>')
  inputStr=inputStr.replaceAll(/^---/mg,'<hr/>')
  inputStr=inputStr.replaceAll(/^[ \t]*[*+-][ \t]+(.*)$/mg,'<li>$1</li>')
  inputStr=inputStr.replaceAll(/(<li>.*<\/li>)(?:\s*<li>.*<\/li>)*/g, '<ul>\n$&\n</ul>')
  inputStr = inputStr.replace(/^[ \t]*\d+\.[ \t]+(.*)$/gm, '<li-ord>$1</li-ord>');
  inputStr = inputStr.replace(/(<li-ord>.*<\/li-ord>)(?:\s*<li-ord>.*<\/li-ord>)*/g, '<ol>\n$&\n</ol>');
  inputStr = inputStr.replace(/li-ord/g, 'li');

  htmlOutput.innerText=inputStr
  htmlPreview.innerHTML=inputStr
}

markdownInput.addEventListener('input',()=>convertMarkdown())
