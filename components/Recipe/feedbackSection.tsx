import { useRouter } from "next/router";

import StyledFeedbackSection from "./feedbackSection.styles";
import StyledButton from "../Button/button.styles";


type Props = {
	handleReduceModalOpen: () => void,

}


const FeedbackSection = ({ handleReduceModalOpen,  }: Props) => {

	const router = useRouter()

	const handleClickBackToHome = () => {
		// FIXME: in this way, nothing show up when user back to this page by back button
		router.push('/')
	}

	return (
		<StyledFeedbackSection>
			<h3>Did you cook this today?</h3>
			<div>
				<StyledButton>Add to Favorite recipe</StyledButton>
				<StyledButton onClick={() => handleReduceModalOpen()}>Reduce Ingredients from Your Fridge</StyledButton>
				<StyledButton backgroundColor="black" onClick={() => handleClickBackToHome()}>Back to Home</StyledButton>
			</div>
		</StyledFeedbackSection>
	)
}

export default FeedbackSection