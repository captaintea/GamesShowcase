import React, {Component} from "react"
import {connect} from "react-redux"
import "./Email.css"
import L from "../../lang/L"
import {sendEmail, setEmail} from "../../modules/PaymentModule"

class Email extends Component {

	sendEmail(email) {
		this.props.sendEmail(email)
	}

	onEmailChange(email) {
		this.props.setEmail(email)
	}

	render() {
		let {email} = this.props
		return <div className="Email">
			<div className="Email__body">
				<div className="Email__title">
					{L.t('fill_email')}
				</div>
				<div className="Email__description">
					{L.t('we_will_send')}
				</div>
				<div className="Email__input">
					<input placeholder={L.t('enter_email')}
						   type="email"
						   className="Input"
						   value={email}
						   onChange={e => this.onEmailChange(e.target.value)}/>
					<button className="Button Button--primary" onClick={() => this.sendEmail(email)}>
						{L.t('forward')}
					</button>
				</div>
			</div>
			<div className="Email__footer">
				{L.t('after_payment')}
			</div>
		</div>
	}
}

function map(state) {
	return {
		email: state.PaymentModule.email,
	}
}

export default connect(map, {setEmail, sendEmail})(Email)
