import React, { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import SectionGenerate from './SectionGenerate';
import SectionIndexes from './SectionIndexes';
import SectionParameters from './SectionParameters';
import SectionNeo4j from './SectionNeo4j';
import SectionPostgres from './SectionPostgres';
import api from '../api/Api';

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
} as const;

function Home() {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [loadingGenerate, setLoadingGenerate] = useState<boolean>(false);
    const [loadingIndexes, setLoadingIndexes] = useState<boolean>(false);
    const [loadingNeo4j, setLoadingNeo4j] = useState<boolean>(false);
    const [loadingPostgres, setLoadingPostgres] = useState<boolean>(false);

    const [userId, setUserId] = useState<number>(0);
    const [productId, setProductId] = useState<number>(0);
    const [depth, setDepth] = useState<number>(0);

    const [time, setTime] = useState<number>(0);
    const [results, setResults] = useState<string>('');

    const handleSubmitGenerate = async (nbUsers: number) => {
        setDisabled(true);
        setLoadingGenerate(true);
        await new Promise((resolve) => {
            setTimeout(resolve, 800);
        });
        setDisabled(false);
        setLoadingGenerate(false);
    };

    const handleCreateIndexes = async () => {
        setDisabled(true);
        setLoadingIndexes(true);
        await new Promise((resolve) => {
            setTimeout(resolve, 800);
        });
        setDisabled(false);
        setLoadingIndexes(false);
    };

    const handleDeleteIndexes = async () => {
        setDisabled(true);
        setLoadingIndexes(true);
        await new Promise((resolve) => {
            setTimeout(resolve, 800);
        });
        setDisabled(false);
        setLoadingIndexes(false);
    };

    const handleSubmitNeo4jQuery1 = async () => {
        setDisabled(true);
        setLoadingNeo4j(true);

        const res = await api.query1('neo4j', userId, depth);
        setTime(res.time);
        setResults(JSON.stringify(res.payload));

        setDisabled(false);
        setLoadingNeo4j(false);
    };

    const handleSubmitNeo4jQuery2 = async () => {
        setDisabled(true);
        setLoadingNeo4j(true);

        const res = await api.query2('neo4j', userId, productId, depth);
        setTime(res.time);
        setResults(JSON.stringify(res.payload));

        setDisabled(false);
        setLoadingNeo4j(false);
    };

    const handleSubmitNeo4jQuery3 = async () => {
        setDisabled(true);
        setLoadingNeo4j(true);
        await new Promise((resolve) => {
            setTimeout(resolve, 800);
        });
        setDisabled(false);
        setLoadingNeo4j(false);
    };

    const handleSubmitPostgresQuery1 = async () => {
        setDisabled(true);
        setLoadingPostgres(true);
        await new Promise((resolve) => {
            setTimeout(resolve, 800);
        });
        setDisabled(false);
        setLoadingPostgres(false);
    };

    const handleSubmitPostgresQuery2 = async () => {
        setDisabled(true);
        setLoadingPostgres(true);
        await new Promise((resolve) => {
            setTimeout(resolve, 800);
        });
        setDisabled(false);
        setLoadingPostgres(false);
    };

    const handleSubmitPostgresQuery3 = async () => {
        setDisabled(true);
        setLoadingPostgres(true);
        await new Promise((resolve) => {
            setTimeout(resolve, 800);
        });
        setDisabled(false);
        setLoadingPostgres(false);
    };

    return (
        <div style={style}>
            <Typography variant="h1">NoSQL</Typography>
            <Typography variant="h4">Generate new Users</Typography>
            <SectionGenerate
                disabled={disabled}
                loading={loadingGenerate}
                onSubmit={handleSubmitGenerate}
            />

            <Typography style={{ marginTop: '20px' }} variant="h4">
                Indexes
            </Typography>
            <SectionIndexes
                disabled={disabled}
                loading={loadingIndexes}
                onCreate={handleCreateIndexes}
                onDelete={handleDeleteIndexes}
            />

            <Typography style={{ marginTop: '20px' }} variant="h4">
                Parameters
            </Typography>
            <SectionParameters
                userId={userId}
                setUserId={setUserId}
                productId={productId}
                setProductId={setProductId}
                depth={depth}
                setDepth={setDepth}
                disabled={disabled}
            />

            <Typography style={{ marginTop: '20px' }} variant="h4">
                Neo4J
            </Typography>
            <SectionNeo4j
                disabled={disabled}
                loading={loadingNeo4j}
                onQuery1={handleSubmitNeo4jQuery1}
                onQuery2={handleSubmitNeo4jQuery2}
                onQuery3={handleSubmitNeo4jQuery3}
            />

            <Typography style={{ marginTop: '20px' }} variant="h4">
                Postgres
            </Typography>
            <SectionPostgres
                disabled={disabled}
                loading={loadingPostgres}
                onQuery1={handleSubmitPostgresQuery1}
                onQuery2={handleSubmitPostgresQuery2}
                onQuery3={handleSubmitPostgresQuery3}
            />

            <Typography style={{ marginTop: '20px' }} variant="h4">
                Results
            </Typography>
            <Typography>time: {time}ms</Typography>
            <Paper style={{ padding: '10px', width: '600px' }}>{results}</Paper>
        </div>
    );
}

export default Home;
