import * as React from 'react'
import { Card } from 'react-bootstrap';
import './ResultItem.scss'

interface Label {
    node: {name: string, color: string}
}

type Props = {
    issue: {title: string, bodyHTML: string; number: number, labels: {edges: Label[]}}
}

function ResultItem(props: Props) {
    return (   
        <div className= "result-item__container">
        <Card>
            <Card.Header className="result-item__header">
                <div className="result-item__header__numberAndLabels">
                    <span className="result-item__header__number">#{props.issue.number} </span>
                    <div className="result-item__header__labels">
                        {props.issue.labels?.edges.map(label => (
                            <span className="badge badge-pill label" style={{backgroundColor: `#${label.node?.color}`}} >{label.node?.name}</span>)
                        )}
                    </div>
                </div>
                <button type="button" className="result-item__header__expandLink btn btn-primary btn-sm">Open this issue</button>
            </Card.Header>
            <Card.Body>
                <Card.Title className="result-item__title">{props.issue.title}</Card.Title>
                <Card.Text className="result-item__body">
                    <div dangerouslySetInnerHTML={{__html: props.issue.bodyHTML}}/>
                </Card.Text>
            </Card.Body>
        </Card>
        </div>
    )
}

export default ResultItem

