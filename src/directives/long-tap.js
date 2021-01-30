export default ({ delay = 400 }) => ({
	bind: function (el, binding, vnode) {

		let timer = null;
		// Run Function
		const emit = () => {
			// binding.value(e)
			vnode.context.$emit('longtap');
		}
		
		const start = (e) => {
			if (e.type === 'click' && e.button !== 0) {
				return;
			}

			if (timer === null) {
				timer = setTimeout(	emit, delay );
			}
		}

		// Cancel Timeout
		const cancel = () => {
			if (timer !== null) {
				clearTimeout(timer)
				timer = null
			}
		}

		;['mousedown', 'touchstart'].forEach(e => el.addEventListener(e, start))
		;['click', 'mouseout', 'touchend', 'touchcancel'].forEach(e => el.addEventListener(e, cancel))
	}
})
