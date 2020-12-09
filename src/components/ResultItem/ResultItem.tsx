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
            <Card.Header>
                <span className="result-item__number">#{props.issue.number} </span>
                {props.issue.labels?.edges.map(label => (
                    <span className="badge badge-pill result-item__label" style={{backgroundColor: `#${label.node?.color}`}} >{label.node?.name}</span>)
                )}
            </Card.Header>
            <Card.Body>
                <Card.Title className="result-item__title">{props.issue.title}</Card.Title>
                <Card.Text className="result-item__body">
                    <div dangerouslySetInnerHTML={{__html: props.issue.bodyHTML}}/>
                </Card.Text>
            <button type="button" className="btn btn-primary btn-sm">Expand Detail</button>
            </Card.Body>
        </Card>
        </div>
    )
}

export default ResultItem

