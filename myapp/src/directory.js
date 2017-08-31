import React, {Component} from 'react';
import { Breadcrumb } from 'antd';

export default class Directory extends Component {
	constructor(props) {
    	super(props);
  	}

	render() {
		return (
			<Breadcrumb style={{ margin: '12px 0' }}>
		      <Breadcrumb.Item>Home</Breadcrumb.Item>
		      <Breadcrumb.Item>List</Breadcrumb.Item>
		      <Breadcrumb.Item>App</Breadcrumb.Item>
		    </Breadcrumb>
		);
	}
}