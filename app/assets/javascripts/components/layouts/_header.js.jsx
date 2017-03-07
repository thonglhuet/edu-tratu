var Header = React.createClass({
  render: function(){
    return(
      <div className='header-container'>
        <header>
          <nav className='navbar navbar-default'>
            <div className='container-fluid'>
              <div className='navbar-header'>
                <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
                 <span className='sr-only'></span>
                 <span className='icon-bar'></span>
                 <span className='icon-bar'></span>
                 <span className='icon-bar'></span>
                  </button>
                  <Img src={Img.assetPath('logo.png')} id="logo"/>
              </div>
              <div className='ollapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                <ul className='nav navbar-nav'>
                  <li><a href=''>Dictionary</a></li>
                  <li><a href=''>About</a></li>
                  <li><a href=''>Contact</a></li>
                </ul>
                <ul className='nav navbar-nav navbar-right'>
                  <li><a href='' className='btn-login'><i className='fa fa-user'></i>Login</a></li>
                  <li>
                    <ul className='social'>
                      <li><a href='#' className='icon-facebook'><i className='fa fa-facebook'></i></a></li>
                      <li><a href="" className='icon-google'><i className='fa fa-google-plus'></i></a></li>
                      <li><a href="#" className='icon-twitter'><i className='fa fa-twitter'></i></a></li>
                      <li><a href="#" className='icon-instagram'><i className='fa fa-instagram'></i></a></li>
                      <li><a href="#" className='icon-youtube'><i className='fa fa-youtube'></i></a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div className='header-main'>
          <Slider />
          <div className='search-container'>
            <Search />
          </div>
        </div>
      </div>
    )
  }
})
