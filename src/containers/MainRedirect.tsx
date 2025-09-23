import { redirect } from 'next/navigation';

export default function MainRedirect() {
	// TODO: 실제 인증 상태 확인 로직 구현
	redirect('/dashboard');
}
