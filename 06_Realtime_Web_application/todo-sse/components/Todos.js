'use strict';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import 'isomorphic-fetch';

// 各ページに関する情報の定義
const pages = {
    index: { title: 'すべてのToDo', fetchQuery: '' },
    active: { title: '未完了のToDo', fetchQuery: '?completed=false' },
    completed: { title: '完了したToDo', fetchQuery: '?completed=true' }
};


const pageLinks = Object.keys(pages).map((page, index) => 
    <Link href={`/${page === 'index' ? '' : page}`} key = {index}>
        <a style={{marginRight: 10}}>{pages[page].title}</a>
    </Link>
);

// Reactコンポーネントの実装
export default function Todos(props){
    const {title, fetchQuery} = pages[props.page];
    const[todos, setTodos] = useState([]);
    useEffect(() => {
        // EventSourceを使用した実装
        const eventSource = new EventSource('/api/todos/events');
        // SSE受信時の処理
        eventSource.addEventListener('message', e => {
            const todos = JSON.parse(e.data);
            setTodos(
                typeof completed === 'undefined'
                ? todos
                : todos.filter(todo => todo.completed === completed )
            );
        });

        // エラーハンドリング
        eventSource.addEventListener('error', e => {console.log('SSEエラー',e)});

        return () => eventSource.close();
    }, [props.page])
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <h1>{title}</h1>
            {/* ToDo一覧の表示 */}
            <ul>
                {todos.map(({id, title, completed}) => 
                    <li key={id}>
                        <span style={completed ? {textDecoration: 'line-through'} : {}}>
                            {title}
                        </span>
                    </li>
                )}
            </ul>
            <div>{pageLinks}</div>
        </>
    )
};