import React, { Component } from 'react';
import './Home.css';
import Banner from "./images/BannerSmall.jpg"
import FrontPicture from "./images/ForsideBillede.png"
import Button from '@material-ui/core/Button';


export class Home extends Component {
  static displayName = Home.name;


  render () {
    return (
      <div className="contentHome">
        <img src={Banner} alt="" fluid="true" className ='banner' />
        <h1 className="overskrift">SimpleGDPR Guide</h1>
        <div className="førstesection">
        <img src={FrontPicture} alt="" fluid="true" className ='forsidebillede' />
        <p className="main-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin semper feugiat mauris. 
          Fusce vel leo nec orci lacinia tincidunt. Sed pharetra quam a urna consectetur vestibulum. 
          Aenean congue nisi in diam interdum mollis. Sed quam magna, ultricies vel elementum vel, consequat et lorem. 
          Nam mollis mi id erat ultrices ullamcorper. Maecenas nisl justo, pellentesque vitae placerat et, condimentum ac neque. 
          Nulla pulvinar eleifend mauris, id porta mi maximus ac. Sed convallis id neque quis hendrerit. 
          Etiam vulputate nulla id dapibus ultricies. Vestibulum bibendum dictum urna, at sodales magna posuere sed. 
          Nullam vestibulum augue non mattis suscipit. Nunc tincidunt orci eros, ut cursus velit dapibus non. 
          Nullam blandit ligula ut porta mollis. Curabitur finibus molestie venenatis. Nullam aliquet scelerisque dui, 
          ac commodo nisi faucibus ut. Proin mattis, metus at pulvinar consectetur, purus mi dapibus felis, 
          sit amet fringilla mauris libero non nibh. Proin id eros a neque dignissim condimentum quis quis nisl. 
          Quisque ultrices bibendum lacus, ac imperdiet augue aliquet et. Aenean nec est quis nibh cursus sagittis. 
          Etiam et sem pulvinar, finibus purus at, feugiat augue. Aliquam venenatis dignissim ultrices. 
          Duis consectetur pellentesque ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
          Nam et dolor in elit tincidunt tempor. Pellentesque ac pulvinar justo.
          </p>
          </div>
          
          <Button
          id='guideKnap'
          size="small"
          >Køb guiden her</Button>

          <p className="second-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin semper feugiat mauris. 
          Fusce vel leo nec orci lacinia tincidunt. Sed pharetra quam a urna consectetur vestibulum. 
          Aenean congue nisi in diam interdum mollis. Sed quam magna, ultricies vel elementum vel, consequat et lorem. 
          Nam mollis mi id erat ultrices ullamcorper. Maecenas nisl justo, pellentesque vitae placerat et, condimentum ac neque. 
          Nulla pulvinar eleifend mauris, id porta mi maximus ac. Sed convallis id neque quis hendrerit. 
          Etiam vulputate nulla id dapibus ultricies. Vestibulum bibendum dictum urna, at sodales magna posuere sed. 
          Nullam vestibulum augue non mattis suscipit. Nunc tincidunt orci eros, ut cursus velit dapibus non. 
          Nullam blandit ligula ut porta mollis. Curabitur finibus molestie venenatis. Nullam aliquet scelerisque dui, 
          ac commodo nisi faucibus ut. Proin mattis, metus at pulvinar consectetur, purus mi dapibus felis, 
          sit amet fringilla mauris libero non nibh. Proin id eros a neque dignissim condimentum quis quis nisl. 
          Quisque ultrices bibendum lacus, ac imperdiet augue aliquet et. Aenean nec est quis nibh cursus sagittis. 
          Etiam et sem pulvinar, finibus purus at, feugiat augue. Aliquam venenatis dignissim ultrices. 
          Duis consectetur pellentesque ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
          Nam et dolor in elit tincidunt tempor. Pellentesque ac pulvinar justo.
          
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin semper feugiat mauris. 
          Fusce vel leo nec orci lacinia tincidunt. Sed pharetra quam a urna consectetur vestibulum. 
          Aenean congue nisi in diam interdum mollis. Sed quam magna, ultricies vel elementum vel, consequat et lorem. 
          Nam mollis mi id erat ultrices ullamcorper. Maecenas nisl justo, pellentesque vitae placerat et, condimentum ac neque. 
          Nulla pulvinar eleifend mauris, id porta mi maximus ac. Sed convallis id neque quis hendrerit. 
          Etiam vulputate nulla id dapibus ultricies. Vestibulum bibendum dictum urna, at sodales magna posuere sed. 
          Nullam vestibulum augue non mattis suscipit. Nunc tincidunt orci eros, ut cursus velit dapibus non. 
          Nullam blandit ligula ut porta mollis. Curabitur finibus molestie venenatis. Nullam aliquet scelerisque dui, 
          ac commodo nisi faucibus ut. Proin mattis, metus at pulvinar consectetur, purus mi dapibus felis, 
          sit amet fringilla mauris libero non nibh. Proin id eros a neque dignissim condimentum quis quis nisl. 
          Quisque ultrices bibendum lacus, ac imperdiet augue aliquet et. Aenean nec est quis nibh cursus sagittis. 
          Etiam et sem pulvinar, finibus purus at, feugiat augue. Aliquam venenatis dignissim ultrices. 
          Duis consectetur pellentesque ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
          Nam et dolor in elit tincidunt tempor. Pellentesque ac pulvinar justo.</p>

          <div className="tomBox"></div>
      </div>
    );
  }
}
