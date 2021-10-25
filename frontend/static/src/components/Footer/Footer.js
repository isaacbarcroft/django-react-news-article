

function Footer(){
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
    return(
        <>
        <footer id = "footer"> © Carolina Code School Student - Isaac Barcroft 
        <div class = "footButton">
        <button onclick={topFunction()} id="myBtn" title="Go to top">Top</button>
        </div>
    </footer>
        </>
    )
}

export default Footer;