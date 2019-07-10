const Preview = () => {
    return(
        <div id="preview-container">
            <h2 id="preview-title">Text converted</h2>
            <div id="preview"></div>
        </div>
    );
}

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: '# Hello World'
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            markdown: e.value 
        });
    }

    render() {
        return(
            <div id="editor-container">
                <h2 id="editor-title">Markdown text</h2>
                <textarea id="editor" onChange={this.handleChange} value={this.state.markdown}></textarea>
            </div>
        );
    }
}

const MarkdownApp = () => {
    return(
        <div>
            <h1 id="app-title">Markdown converter</h1>
            <div id="components-container">
                <Editor/>
                <Preview/>
            </div>
        </div>
    );
}


ReactDOM.render(<MarkdownApp/>, document.querySelector('#app'));