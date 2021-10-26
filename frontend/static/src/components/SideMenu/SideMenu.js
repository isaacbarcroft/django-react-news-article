

function SideMenu(props){

    const localLinks = <div className="shadow p-3 mb-5 bg-body rounded mt-3"><h2>Related Local News</h2>
    <ul>
        <li>
            <a  href="https://www.greenvilleonline.com/" target="_blank">GREENVILLE ONLINE</a>
        </li>
        <li>
            <a href="https://www.wyff4.com/" target="_blank">wyff4</a>
        </li>
        <li>
            <a href="https://www.foxcarolina.com/" target="_blank">FOX CAROLINA</a>
        </li>
    </ul></div> 

const worldLinks = <div className="shadow p-3 mb-5 bg-body rounded mt-3"><h2>Related World News</h2>
<ul>
    <li>
        <a  href="https://www.bbc.com/news/world" target="_blank">BBC</a>
    </li>
    <li>
        <a href="https://www.nytimes.com/section/world" target="_blank">NY TIMES</a>
    </li>
    <li>
        <a href="https://www.nbcnews.com/world" target="_blank">NBC</a>
    </li>
</ul></div> 

    const sportsLinks = <div className="shadow p-3 mb-5 bg-body rounded mt-3"><h2>Related Sports News</h2>
        <ul>
            <li>
                <a  href="https://www.espn.com/soccer/" target="_blank">ESPN</a>
            </li>
            <li>
                <a href="https://www.goal.com/en-us" target="_blank">GOAL</a>
            </li>
            <li>
                <a href="https://www.cbssports.com/soccer/" target="_blank">CBS</a>
            </li>
        </ul></div> 

    return(
        <>
        {localLinks}
       {sportsLinks}
       {worldLinks}
        </>
    )
}

export default SideMenu;