import React, { ChangeEvent } from 'react';

/* eslint-disable-next-line */
export interface AuthorsProps {}
export interface AuthorsState {
  name: string,
  count: number,
  top10: AuthorInfo[],
}

export interface AuthorInfo {
  name: string,
  count: number
}

class Authors extends React.Component<AuthorsProps, Partial<AuthorsState>>{
  constructor(props: AuthorsProps) {
    super(props);
    this.state = {
      name: '',
      count: 0,
      top10: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoadButton = this.handleLoadButton.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!this.state.name || !this.state.count) {
      alert("Не правильно введены данные");
      return;
    }

    fetch(`http://localhost:3333/api/authors/${this.state.name}/${this.state.count}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        alert(this.state.name + ' успешно создана!');
        this.setState({
          name: '',
          count: 0,
          top10: []
        });
      })
      .catch((error) => {
        alert('Ошибка :-(');
      });
  }

  handleLoadButton() {
    fetch('http://localhost:3333/api/authors/', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        const dSplit = data.toString().split(",");
        if (dSplit.length < 2 && dSplit.length % 2 !== 0) {
          throw new Error();
        }

        const authorsArray: AuthorInfo[] = [];

        for(let i = 0; i < dSplit.length; i += 2) {
          const name = dSplit[i];
          const count = dSplit[i + 1];

          authorsArray.push({name, count});
        }

        this.setState({ top10: authorsArray });

      })
      .catch((error) => {
        alert('Ошибка :-(');
      });
  }

  override render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Рейтинг авторов</h1>
          <p>
            <label>
              <h4>Имя автора</h4>
              <input required name="name" type="text" value={this.state.name} onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              <h4>Кол-во публикаций</h4>
              <input required name="count" type='number' value={this.state.count} onChange={this.handleChange} />
            </label>
          </p>
          <input type="submit" value="Добавить" />
        </form>
        <br/>
        <button onClick={this.handleLoadButton}>Показать топ-10 авторов</button>
        {this.state.top10?.map((authorInfo, index) => {
        return <div key={authorInfo.name}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: '20px'}}>
            <div>{index + 1}</div>
            <h2>{authorInfo.name}</h2>
            <div>{authorInfo.count}</div>
          </div>
          <hr/>
        </div>
      })}
      </div>
    );
  }
}

export default Authors;
