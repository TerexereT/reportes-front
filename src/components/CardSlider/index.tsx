import AgregadorContext, { TAgregador } from 'context/AgregadorContext';
import entradaMilpagos from 'images/entrada1000Pagos.jpeg';
import entradaCarropago from 'images/fondoCarropago.jpeg';
import entradaLibrepago from 'images/fondoLibrepago.jpeg';
import logo1000pagos from 'images/Logo-1000Pagos-Horizontal.png';
import logoCarropago from 'images/logo-carropago.png';
import logoLibrepago from 'images/logo_librePago.png';
import { FC, useContext, useEffect, useReducer, useRef } from 'react';
import { useStyles } from './styles';
import './styles/index.scss';

interface ISlide {
	title: string;
	description: JSX.Element;
	image: string;
	value: TAgregador;
}

const slides: ISlide[] = [
	{
		title: 'CARROPAGO',
		description: <img src={logoCarropago} alt='' style={{ width: '65%' }} />,
		image: entradaCarropago,
		value: 'Carropago',
	},
	{
		title: 'MILPAGOS',
		description: <img src={logo1000pagos} alt='' style={{ width: '65%' }} />,
		image: entradaMilpagos,
		value: 'Milpagos',
	},
	{
		title: 'LIBREPAGO',
		description: <img src={logoLibrepago} alt='' style={{ width: '65%' }} />,
		image: entradaLibrepago,
		value: 'Librepago',
	},
];

const useTilt = (active: true | null) => {
	const ref = useRef(null);

	useEffect(() => {
		if (!ref.current || !active) {
			return;
		}

		const state: any = {
			rect: undefined,
			mouseX: undefined,
			mouseY: undefined,
		};

		let el: any = ref.current;

		const handleMouseMove = (e: any) => {
			if (!el) {
				return;
			}
			if (!state.rect) {
				state.rect = el.getBoundingClientRect();
			}
			state.mouseX = e.clientX;
			state.mouseY = e.clientY;
			const px = (state.mouseX - state.rect.left) / state.rect.width;
			const py = (state.mouseY - state.rect.top) / state.rect.height;

			el.style.setProperty('--px', px);
			el.style.setProperty('--py', py);
		};

		el.addEventListener('mousemove', handleMouseMove);

		return () => {
			el.removeEventListener('mousemove', handleMouseMove);
		};
	}, [active]);

	return ref;
};

const initialState = {
	slideIndex: 1,
};

const slidesReducer = (state: any, event: any) => {
	if (event.type === 'NEXT') {
		return {
			...state,
			slideIndex: state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
		};
	}
	if (event.type === 'PREV') {
		return {
			...state,
			slideIndex: (state.slideIndex + 1) % slides.length,
		};
	}
};

const Slide = ({ slide, offset }: any) => {
	const active = offset === 0 ? true : null;
	const ref = useTilt(active);
	const { setAgregador } = useContext(AgregadorContext);

	return (
		<div
			ref={ref}
			className='slide'
			data-active={active}
			onClick={() => {
				setAgregador(slide.value);
			}}
			style={{
				'--offset': offset > 1 ? 1 : offset < -1 ? -1 : offset,
				'--dir': offset === 0 ? 0 : offset > 0 ? 1 : -1,
			}}>
			<div
				className='slideContent'
				style={{
					position: 'relative',
				}}>
				<div
					style={{
						width: '16vw',
						height: '16vw',
						position: 'absolute',
						backgroundSize: 'cover',
						backgroundImage: `url('${slide.image}')`,
						filter: 'blur(4px)',
					}}></div>
				<div className='slideContentInner'>
					{slide.description}
					{/* <img src={slide.description} alt='' style={{ width: '65%' }} /> */}
					{/* <h2 className={classes.cardTitle}>{slide.title}</h2> */}
					{/* <h3 className='slideSubtitle'>{slide.subtitle}</h3> */}
					{/* <p className='slideDescription'>{slide.description}</p> */}
				</div>
			</div>
		</div>
	);
};

const CardSlider: FC = () => {
	const classes = useStyles();
	const [state, dispatch] = useReducer(slidesReducer, initialState);
	const { Agregador, setAgregador } = useContext(AgregadorContext);
	return (
		<div className={classes.slides}>
			<button onClick={() => dispatch({ type: 'PREV' })}>‹</button>

			{slides.map((slide, i) => {
				let offset = state.slideIndex - i;
				return <Slide slide={slide} offset={offset} key={i} />;
			})}
			<button onClick={() => dispatch({ type: 'NEXT' })}>›</button>
		</div>
	);
};

export default CardSlider;
