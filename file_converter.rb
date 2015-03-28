set :public_folder, 'public'

post '/download' do
	content_type('image/svg+xml')
	params[:val]
end

