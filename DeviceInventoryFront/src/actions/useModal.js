import { useState } from 'react';
import { useEffect } from 'react';

const useModal = () => {
	const [isShowing, setIsShowing] = useState(false);

	useEffect(() => {
		if(isShowing)
		{
			document.body.style.overflow = "hidden"
		}
		else
		{
			document.body.style.overflow = "scroll"
		}
	  }, [isShowing]);

	function toggle()
	{
		setIsShowing(!isShowing);
	}

	return [
		isShowing,
		toggle
	];
}

export default useModal;
