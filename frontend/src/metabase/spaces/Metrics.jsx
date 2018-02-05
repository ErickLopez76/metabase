import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "metabase/spaces/Link"
import Modal from "metabase/components/Modal";

import { Box, ButtonOutline, Button, Card, Flex, Heading, Subhead } from 'rebass'

import {
    getMetricsForSpace,
    getCurrentSpace
} from './selectors'

const mapStateToProps = (state) => {
    return {
        space: getCurrentSpace(state),
        metrics: getMetricsForSpace(state),
        spaces: state._spaces.spaces
    }
}

@connect(mapStateToProps)
export class Metrics extends Component {
    state = {
        showModal: false
    }
    render () {
        const { metrics, space, spaces } = this.props

        // NOTE Atte Keinänen 2/5/18: Simple hack for displaying a warning
        // while still keeping the router paths and component code in place
        if (!space) {
            return <h3>This section isn't demoable yet</h3>
        }

        return (
            <Box w={2/3}>
                <Link to={`/_spaces/${space.slug}/guide`}>Back</Link>
                <Heading>Metrics</Heading>
                <Flex wrap>
                    { metrics.map(metric =>
                        <Box key={metric.id} w={1/3}>
                            <Card p={3}>
                                <Flex align='center'>
                                    <Link to='Metric' params={{ id: metric.id, space: space.slug }}>
                                        <Subhead>
                                            {metric.name}
                                        </Subhead>
                                    </Link>
                                    <Box ml='auto' onClick={() => this.setState({ showModal: true })}>
                                        Spaces
                                    </Box>
                                </Flex>
                            </Card>
                        </Box>
                    )}
                </Flex>
                <Modal
                    isOpen={this.state.showModal}
                >
                    <Flex>
                        <Box onClick={() => this.setState({ showModal: false })} ml='auto'>
                            Close
                        </Box>
                    </Flex>
                    <Subhead>Spaces</Subhead>
                    { spaces.map(s =>  {
                        return (
                            <Flex align='center'>
                                { s.name }
                                <ButtonOutline ml='auto'>
                                    { s.id === space.id ? 'Remove' : 'Add' }
                                </ButtonOutline>
                            </Flex>
                        )
                    })}
                    <Button onClick={() => this.setState({ showModal: false })}>
                        Done
                    </Button>
                </Modal>
            </Box>
        )
    }
}

