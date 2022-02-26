import React, { Component } from 'react'

import { BroswerRouter as Router, Link, NavLink, Switch, Route, Redirect, withRouter } from 'reach-dom-router'

// HashRouter state 传参时，刷新会丢失
// BroswerRouter state 传参，刷新不会丢失，因为会保存在history里面，但是清楚缓存，新标签打开也会丢失

// Route 相当于接口 
// 

class _Header extends Component {
  back = () => {
    this.props.history.goBack()
  }
  forward = () => {
    this.props.history.goForward()
  }
  render() {
    return (
      <div>
        Header
        <button onClick={this.forward}>前进</button>
        <button onClick={this.forwarbackd}>回退</button>
      </div>
    )
  }
}

// 使普通的组件拥有路由组件的 props.history
const Header = withRouter(_Header)

class Home extends Component {
  // 通过 props 可以拿到里面的 路由信息
  routerPush = () => {
    // this.props.history.push(path, state)
    // parmas this.props.location.params
    this.props.history.push(`/home/张三/18`)
    link = <Link to={`/home/张三/18`}></Link>
    // serach  this.props.location.search  => ?name=张三&age=18 | qs 插件 qs.stringify qs.parse
    // 没有解析，要自己解析
    this.props.history.push(`/home?name=张三&age=18`)
    link = <Link to={`/home?name=张三&age=18`}></Link>
    // state  this.props.location.state
    this.props.history.push(`/home`, {name: '张三', age: '18'})
    link = <Link to={{path: '/home', state: {name: '张三', age: '18'}}}></Link>

  }

  render() {
    return (
      <div>
        home
      </div>
    )
  }

}


function About() {
  return <div>
    About
  </div>
}

export default class ExampleRouter extends Component {

  render() {
    return (
      <div>
        <Header></Header>
        <div className="nav-container">
          {/* // props.children === Vue 里面 的 $slots.default */}
          <MyNavLink to="/home">哈哈哈</MyNavLink>
          {/* // 等价于 */}
          {/*  */}
          <MyNavLink to="/home" children="哈哈哈" />

          {/* 
            NavLink 和 Link 的区别
            NavLink 是当前激活的路由会添加一个 active 类
          */}
          <NavLink to="about">About</NavLink>

          {/* 
            匹配模式
              /home ==> /home/a/b  x 不能匹配
              /home/a/b ==> /home  v 模糊匹配，能匹配（包含，从前面开始匹配）
            
            exact 准确的 精确匹配
              /home/a/b ==> /home  x 不能匹配
          */}

        </div>
        <div className="view-container">
          <Switch>
            <Route to="/home" component={Home}></Route>
            {/* 第二种 */}
            <Route to="/about">
              <About></About>
            </Route>

            {/* Readirect 必须放在 Switch 的最后 */}
            {/* 都没有匹配上 */}



            {/* <Redirect to="/404"></Redirect> */}

            {/* // 匹配未找到的路由 */}
            <Route component={NoMatch} />
          </Switch>

        </div>
      </div>
    )
  }
}

React.readerDOM(
  <Router>
    <ExampleRouter />
  </Router>
  , document.getElementById('root'))


