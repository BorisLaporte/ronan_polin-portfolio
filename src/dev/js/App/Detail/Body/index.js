import React, { Component } from 'react'

import Specs from './Specs'
import MiseEnBouche from './MiseEnBouche'
import Team from './Team'
import Description from './description'
import PreMess from './PreMess'
import TheMaze from './TheMaze'

class Body extends Component {
	render() {
		const {data} = this.props
		const {
			title,
			specs, 
			miseEnBouche, 
			chapeau, 
			team, 
			description, 
			logo,
			preMess,
			theMaze
		} = data
		return (
			<div className="page">
				<div className="body withBounds">
					<Description data={description} />
					<img src={require("IMG/"+logo)} alt="logo" className="logo center"/>
					<Specs data={specs}/>
					<MiseEnBouche data={miseEnBouche} />
					<h2 className="chapeau center" >{chapeau}</h2>
					<PreMess data={preMess} />
				</div>
				<TheMaze title={title} data={theMaze} />
				{ (team.length > 0) && <Team data={team}/> }
			</div>
		)
	}
}

export default Body