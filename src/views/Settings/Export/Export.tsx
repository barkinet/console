import * as React from 'react'
import * as download from 'downloadjs'
import * as Relay from 'react-relay'
import {Viewer} from '../../../types/types'

interface Props {
  viewer: Viewer
}

class Export extends React.Component<Props, {}> {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className='container'>
        <style jsx={true}>{`

          .container {
            @inherit: .br, .pv38;
            max-width: 700px;
            border-color: rgba( 229, 229, 229, 1);
          }

          .exportDataContainer {
            @inherit: .flex, .itemsCenter, .justifyBetween, .mt16, .pl60, .pb38, .bb;
            border-color: rgba( 229, 229, 229, 1);
          }

          .exportDataTitle {
            @inherit: .pb6, .mb4, .black30, .f14, .fw6, .ttu;
          }

          .exportDataDescription {
            @inherit: .pt6, .mt4, .black50, .f16;
          }

          .button {
            @inherit: .green, .f16, .pv10, .ph16, .mh60, .pointer, .br2, .nowrap;
            background-color: rgba(28,191,50,.2);
          }

          .exportSchemaContainer {
            @inherit: .flex, .itemsCenter, .justifyBetween, .mt38, .pl60;
          }

          .exportSchemaTitle {
            @inherit: .pb6, .mb4, .black30, .f14, .fw6, .ttu;
          }

          .exportSchemaDescription {
            @inherit: .pt6, .mt4, .black50, .f16;
          }

        `}</style>
        <div className='exportDataContainer'>
          <div>
            <div className='exportDataTitle'>Export data</div>
            <div className='exportDataDescription'>
              This is the data of your project that is stored to in the nodes.
              Here you can download everything.
            </div>
          </div>
          <div
            className='button'
            onClick={this.exportData}
          >
            Export Data
          </div>
        </div>
        <div className='exportSchemaContainer'>
          <div>
            <div className='exportSchemaTitle'>Export data</div>
            <div className='exportSchemaDescription'>
              This is the schema representing the models and fields of your project.
              For example, you can use it to generate a blueprint of it.
            </div>
          </div>
          <div
            className='button'
            onClick={this.exportSchema}
          >
            Export Schema
          </div>
        </div>
      </div>
    )
  }

  private exportSchema = (): void => {
    download(this.props.viewer.project.schema, 'schema', '')
  }

  private exportData = (): void => {
    download(this.props.viewer.project.schema, 'schema', '')
  }

}

export default Relay.createContainer(Export, {
  initialVariables: {
    projectName: null, // injected from router
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        project: projectByName(projectName: $projectName) {
          name
          id
          schema
        }
      }
    `,
  },
})
