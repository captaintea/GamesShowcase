import React, {Component} from "react"
import {connect} from "react-redux"
import "./EmailMobile.css"
import L from "../../lang/L"
import {sendEmail, setEmail} from "../../modules/PaymentModule"

class EmailMobile extends Component {

	sendEmail(email) {
		this.props.sendEmail(email)
	}

	onEmailChange(email) {
		this.props.setEmail(email)
	}

	render() {
		let {email} = this.props
		return <div className="EmailMobile">
			<div className="EmailMobile__body">
				<div className="EmailMobile__title">
					{L.t('fill_email')}
				</div>
				<div className="EmailMobile__description">
					{L.t('we_will_send')}
				</div>
				<div className="EmailMobile__input">
					<input placeholder={L.t('enter_email')} type="email"
						   value={email}
						   onChange={e => this.onEmailChange(e.target.value)}/>
				</div>
				<div className="EmailMobile__controls">
					<button className="Button Button--primary mobile" onClick={() => this.sendEmail(email)}>
						{L.t('forward')}
					</button>
				</div>
			</div>
			<div className="EmailMobile__footer">
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

export default connect(map, {setEmail, sendEmail})(EmailMobile)
