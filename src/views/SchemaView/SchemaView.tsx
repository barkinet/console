import * as React from 'react'
import SchemaOverview from './SchemaOverview/SchemaOverview'
import SchemaEditor from './SchemaEditor'
import SchemaHeader from './SchemaHeader'
import * as Relay from 'react-relay'
import {Viewer} from '../../types/types'

interface Props {
  viewer: Viewer
  location: any
}

class NewSchemaView extends React.Component<Props,null> {
  render() {
    const {viewer, location} = this.props
    return (
      <div className='schema-view'>
        <style jsx>{`
          .schema-view {
            @p: .flex, .flexColumn, .h100;
            background-color: rgb(11,20,28);
          }
          .schema-wrapper {
            @p: .flex, .h100, .pt6, .bgDarkBlue;
          }
        `}</style>
        <SchemaHeader projectName={viewer.project.name} />
        <div className='schema-wrapper'>
          <SchemaEditor project={viewer.project} />
          <SchemaOverview location={location} project={viewer.project} />
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default Relay.createContainer(NewSchemaView, {
  initialVariables: {
    projectName: null, // injected from router
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        project: projectByName(projectName: $projectName) {
          id
          name
          ${SchemaEditor.getFragment('project')}
          ${SchemaOverview.getFragment('project')}
        }
      }
    `,
  },
})