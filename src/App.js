import React from 'react';
import styles from './App.module.scss';
import Input from './components/Input/Input';
import Board from './Board/Board';
import Button from './components/Button/Button';
import produce from 'immer/dist/immer';

class App extends React.PureComponent {
	state = {
		family: {
			items: [ 'Walter', 'Rocio', 'Mia', 'Walter Jr' ],
			index: 0
		},
		sports: {
			items: [ 'Futbol', 'Beisbol', 'Basquetbol' ],
			index: 0
		},
		numbers: {
			items: [ 'Uno', 'Dos', 'Tres' ],
			index: 0
		},
		drinks: {
			items: [ 'Soda', 'Coffe' ],
			index: 0
		},
		input: '',
		output: ''
	};

	onHandleButton = (object) => {
		const nextState = produce(this.state, (draft) => {
			if (draft[object].items.length > draft[object].index + 1) draft[object].index = draft[object].index + 1;
			else draft[object].index = 0;
		});
		this.setState(nextState);
	};

	onAddButtonClick = (object) => {
		const { input } = this.state;
		const nextState = produce(this.state, (draft) => {
			draft[object].items = draft[object].items.concat(input);
		});
		this.setState(nextState);
		
	};

	onInputChange = (event) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.input = value;
		});
		this.setState(nextState);
	};
	onOutputChange = (event) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft.output = value;
		});
		this.setState(nextState);
	};

	onQuitButtonClick = (object) => {
		const { output } = this.state;
		const nextState = produce(this.state, (draft) => {
			const filteredItems = draft[object].items.slice(0, output).concat(draft[object].items.slice(output + 1, draft[object].items.length))
			draft[object].items = filteredItems

		});
		this.setState(nextState);
	};

	render() {
		const { family, sports, numbers, drinks, input,output } = this.state;
		return (
			<div>
				<p className={styles.title}>¡Bienvenidos al curso de programación de cómputo móvil!</p>
				<div className={styles.container_boards}>
					<div className={styles.grilla}>
					<Input value={input} onChange={this.onInputChange} />
					<Button label={'Agregar'} onClick={() => this.onAddButtonClick('family')}  />
					<Board items={family.items} index={family.index} label={'Siguiente'} onButtonClick={() => this.onHandleButton('family')} />			
					<div className={styles.grilla}>
					<Input value={output} onChange={this.onOutputChange} />
					<Button label={'Borrar'} onClick={() => this.onQuitButtonClick('family')}  />
					</div>
					</div>
					<div className={styles.grilla}>
					<Input value={input} onChange={this.onInputChange} />
					<Button label={'Agregar'} onClick={() => this.onAddButtonClick('sports')}  />
					<Board items={sports.items} index={sports.index} label={'Siguiente'} onButtonClick={() => this.onHandleButton('sports')} />
					<div className={styles.grilla}>
					<Input value={output} onChange={this.onOutputChange} />
					<Button label={'Borrar'} onClick={() => this.onQuitButtonClick('sports')}  />
					</div>
					</div>
					<div className={styles.grilla}>
					<Input value={input} onChange={this.onInputChange} />
					<Button label={'Agregar'} onClick={() => this.onAddButtonClick('numbers')}  />
					<Board items={numbers.items} index={numbers.index} label={'Siguiente'} onButtonClick={() => this.onHandleButton('numbers')} />
					<div className={styles.grilla}>
					<Input value={output} onChange={this.onOutputChange} />
					<Button label={'Borrar'} onClick={() => this.onQuitButtonClick('numbers')}  />
					</div>
					</div>
					<div className={styles.grilla}>
					<Input value={input} onChange={this.onInputChange} />
					<Button label={'Agregar'} onClick={() => this.onAddButtonClick('drinks')}  />
					<Board items={drinks.items} index={drinks.index} label={'Siguiente'} onButtonClick={() => this.onHandleButton('drinks')} />
					<div className={styles.grilla}>
					<Input value={output} onChange={this.onOutputChange} />
					<Button label={'Borrar'} onClick={() => this.onQuitButtonClick('drinks')}  />
					</div>
					</div>

				
				</div>

				<div className={styles.container_boards}>
					


					
				</div>
				{
					<p className={styles.result}>
						Resultado: <br />
						<label> {family.items[family.index]} </label>
						<br />
						<label> {sports.items[sports.index]} </label>
						<br />
						<label> {numbers.items[numbers.index]} </label>
						<br />
						<label> {drinks.items[drinks.index]} </label>
						<br />
					</p>
				}
			</div>
		);
	}
}

export default App;
