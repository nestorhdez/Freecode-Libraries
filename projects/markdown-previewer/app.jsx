// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
    breaks: true,
    renderer: renderer
});

const Preview = (props) => {
    return(
        <div id="preview-container">
            <h2 id="preview-title">Text converted</h2>
            <div id="preview" dangerouslySetInnerHTML={{__html: props.markdownCoverted}}></div>
        </div>
    );
}

const Editor = (props) => {
    return(
        <div id="editor-container">
            <h2 id="editor-title">Markdown text</h2>
            <textarea id="editor" onChange={props.handleChange} value={props.markdown}></textarea>
        </div>
    );
}

class MarkdownApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: placeHolder
        }
        this.handleChange = this.handleChange.bind(this);
        this.convertMardown = this.convertMardown.bind(this);
    }

    convertMardown(text) {
        return DOMPurify.sanitize(marked(text));
    }

    handleChange(e) {
        this.setState({
            markdown: e.target.value
        });
    }

    render() {
        return(
            <div>
                <h1 id="app-title">Markdown converter</h1>
                <div id="components-container">
                    <Editor handleChange={this.handleChange} markdown={this.state.markdown}/>
                    <Preview markdownCoverted={this.convertMardown(this.state.markdown)}/>
                </div>
            </div>
        );
    }
}

const placeHolder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`


ReactDOM.render(<MarkdownApp/>, document.querySelector('#app'));