import React, { PropTypes } from 'react'
import Relay from 'react-relay'
import { Link } from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import mapProps from 'map-props'
import Icon from 'components/Icon/Icon'
import AddModelMutation from 'mutations/AddModelMutation'
import classes from './SideNav.scss'

export class SideNav extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    models: PropTypes.array,
  };

  constructor (props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this._addModel = ::this._addModel
  }

  _addModel () {
    const modelName = window.prompt('Model name')
    if (modelName) {
      Relay.Store.commitUpdate(new AddModelMutation({
        modelName,
        projectId: this.props.params.projectId,
      }))
    }
  }

  render () {
    return (
      <div className={classes.root}>
        <Link
          to={`/${this.props.params.projectId}/models`}
          className={classes.head}
          >
          <Icon width={19} height={19} src={require('assets/icons/model.svg')} />
          <span>Models</span>
        </Link>
        {this.props.models &&
          this.props.models.map((model) => (
            <Link
              key={model.name}
              to={`/${this.props.params.projectId}/models/${model.id}`}
              className={classes.listElement}
              activeClassName={classes.listElementActive}
              >
              {model.name}
            </Link>
          ))
        }
        <div className={classes.add} onClick={this._addModel}>+ Add model</div>
        <Link
          to={`/${this.props.params.projectId}/playground`}
          className={classes.head}
          >
          <Icon width={19} height={19} src={require('assets/icons/play.svg')} />
          <span>Playground</span>
        </Link>
      </div>
    )
  }
}

const MappedSideNav = mapProps({
  params: (props) => props.params,
  models: (props) => props.project.models.edges.map((edge) => edge.node),
})(SideNav)

export default Relay.createContainer(MappedSideNav, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id
        name
        models(first: 10) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
  },
})