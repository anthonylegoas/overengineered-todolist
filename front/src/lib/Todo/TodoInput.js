import { html, css, LitElement } from 'lit';

export class TodoInput extends LitElement {
	static get styles() {
		return css`
			p {
				color: blue;
			}

			input {
				border: 1px solid transparent;
				font-size: 28px;
				width: 100%;
				padding: 0.5em 1em 0.3em 1em;
				box-sizing: border-box;
				background: rgba(255, 255, 255, 1);
				border-radius: 8px;
				text-align: center;
			}

			input:focus-visible {
				box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
				border: 1px solid #ff3e00 !important;
				outline: none;
			}
		`;
	}

	static get properties() {
		return {
			placeholder: { type: String }
		};
	}

	constructor() {
		super();
	}

	render() {
		return html`<input
			name="text"
			aria-label="Add todo"
			placeholder="${this.placeholder}"
            @keyup="${this._onKeyUpHandler}"
		/>`;
	}

	_onKeyUpHandler(event) {
		if (event.key === 'Enter') {
			this.dispatchEvent(new CustomEvent('add-todo', { detail: { value: event.target.value } }));
            event.target.value = "";
		}

	}
}

customElements.define('todo-input', TodoInput);
