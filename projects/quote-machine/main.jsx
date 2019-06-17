const Caption = () => {
    return(
      <p id={'caption'}>by <a href={'https://nestorhh.netlify.com'} target={'_blank'}>Néstor Hdez</a> with React <i class="fab fa-react"></i></p>
    );
  }
  
  const Button = (props) => {
    return(
      <button onClick={props.handleClick} id={props.id} className={props.className} title={props.title}>
        {props.children}
      </button>
    );
  }
  
  class QuoteBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        randomIndex: '',
        quote: '',
        author: '',
        color: ''
      }
      this.setRandomIndex = this.setRandomIndex.bind(this);
      this.newQuote = this.newQuote.bind(this);
    }
    
    quotesLink = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
    colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
    quotesArray = [];
  
    setRandomIndex(length)  {
      return Math.floor(Math.random() * length)
    }
    
    componentDidMount() {
      fetch(this.quotesLink)
      .then(response => response.json())
      .then((res) => {
        this.quotesArray = res.quotes;
        const initialRandomIndex = this.setRandomIndex(this.quotesArray.length);
        this.setState({
          randomIndex: this.setRandomIndex(this.quotesArray.length),
          quote: this.quotesArray[initialRandomIndex].quote,
          author: this.quotesArray[initialRandomIndex].author,
          color: this.colors[this.setRandomIndex(this.colors.length)]
        });
      });
    }
  
    newQuote() {
      this.setState({
        randomIndex: this.setRandomIndex(this.quotesArray.length),
        quote: this.quotesArray[this.state.randomIndex].quote,
        author: this.quotesArray[this.state.randomIndex].author,
        color: this.colors[this.setRandomIndex(this.colors.length)]
      });
    }
  
    openLink(link) {
      window.open(link, '_blank');
    }
    
    render() {
      document.documentElement.style.setProperty('--random-color', this.state.color );
      const tweet = 'https://twitter.com/intent/tweet?text=' + '"' + encodeURIComponent(this.state.quote) + '"' + ' ' + encodeURIComponent(this.state.author);
     
      return (
        <div>
            <a id="arrow-back" href="../../index.html"><i class="fas fa-arrow-left"></i></a>
            <div id={'quote-box'}>
                <h1 id={'text'}>{this.state.quote}</h1>
                <h2 id={'author'}>{this.state.author}</h2>
                <div id={'buttons-wrapper'}>
                    <Button handleClick={()=>{this.openLink(tweet)}} id={'tweet-intent'} className={'button'} title={'Tweet this quote'}>
                        <i class="fab fa-twitter"></i>
                    </Button>
                    <Button handleClick={this.newQuote} id={'new-quote'} className={'button'}>New quote</Button>
                </div>
          </div>
          <Caption/>
        </div>
      ); 
    }
  }
  
  ReactDOM.render(<QuoteBox/>, document.getElementById('app'));