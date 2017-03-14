import * as React from 'react'
const Codemirror: any = require('react-codemirror')
import * as Relay from 'react-relay'
import {Project} from '../../types/types'
import * as FileSaver from 'file-saver'

interface Props {
  project: Project
}

require('graphcool-graphiql/graphiql_dark.css')

class SchemaEditor extends React.Component<Props,null> {
  render() {
    require('codemirror/addon/hint/show-hint')
    require('codemirror/addon/comment/comment')
    require('codemirror/addon/edit/matchbrackets')
    require('codemirror/addon/edit/closebrackets')
    require('codemirror/addon/fold/foldgutter')
    require('codemirror/addon/fold/brace-fold')
    require('codemirror/addon/lint/lint')
    require('codemirror/keymap/sublime')
    require('codemirror-graphql/hint')
    require('codemirror-graphql/lint')
    require('codemirror-graphql/info')
    require('codemirror-graphql/jump')
    require('codemirror-graphql/mode')

    return (
      <div className='schema-editor'>
        <style jsx={true}>{`
          .schema-editor {
            @p: .flex1, .bgDarkerBlue;
            border-top: 6px solid $darkBlue;
            height: calc(100% - 6px);
          }
          .schema-editor :global(.CodeMirror) {
            height: calc(100vh - 57px - 86px);
            padding: 25px;
            padding-left: 16px;
          }
          .footer {
            @p: .flex, .w100, .pa25, .relative;
            &:after {
              @p: .absolute, .left0, .right0, .top0;
              z-index: 30;
              margin-top: -86px;
              content: "";
              height: 100px;
              background: linear-gradient(to top, $darkerBlue, rgba(0,0,0,0));
            }
          }
          .button {
            @p: .bgWhite04, .fw6, .f14, .white50, .ttu, .br2, .pointer, .o50;
            padding: 7px 9px 8px 11px;
            letter-spacing: 0.53px;
            transition: $duration linear opacity;
          }
          .button:hover {
            @p: .o100;
          }
        `}</style>
        <Codemirror
          value={this.props.project.schema}
          options={{
            height: 'auto',
            viewportMargin: Infinity,
            mode: 'graphql',
            theme: 'graphiql',
            readOnly: true,
            lineNumbers: true,
          }}
          onFocusChange={(focused) => {
            if (focused) {
              // TODO track
            }
          }}
        />
        <div className='footer'>
          <div className='button' onClick={this.downloadSchema}>Export Schema</div>
        </div>
      </div>
    )
  }

  private downloadSchema = () => {
    const blob = new Blob([this.props.project.schema], {type: 'text/plain;charset=utf-8'})
    FileSaver.saveAs(blob, `${this.props.project.name}.schema`)
  }
}

export default Relay.createContainer(SchemaEditor, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        schema
        name
      }
    `,
  },
})
