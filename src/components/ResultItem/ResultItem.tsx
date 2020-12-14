import * as React from 'react'
import { useState } from 'react';
import { Button, Card, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ResultItem.scss'

interface Label {
    node: {name: string, color: string}
}

type Props = {
    issue: {title: string, bodyHTML: string; number?: number, labels: {edges: Label[]}}
    isDetail: boolean
}

function ResultItem(props: Props) {

    const [open, setOpen] = useState(false);
    
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
                {!props.isDetail && (<Link to={`/detail/${props.issue.number}`} target="_blank">
                    <Button className="result-item__header__expandLink" variant="outline-info">Go to Detail</Button>
                </Link>)}
            </Card.Header>
            <Card.Body>
                <Card.Title className="result-item__title">{props.issue.title}</Card.Title>
                {!props.isDetail ? (<Collapse in={open}>
                    <Card.Text className="result-item__body">
                        <div dangerouslySetInnerHTML={{__html: props.issue.bodyHTML}}/>
                    </Card.Text>
                </Collapse>) : (
                <Card.Text className="result-item__body">
                        <div dangerouslySetInnerHTML={{__html: props.issue.bodyHTML}}/>
                    </Card.Text>)}
                {!props.isDetail && !open && (<Button onClick={() => setOpen(!open)} variant="link" aria-controls="example-collapse-text" aria-expanded={open}>
                    See More
                </Button>)}
            </Card.Body>
        </Card>
        </div>
    )
}

export default ResultItem

