import random
from django.core.management.base import BaseCommand
from news_api.models import (
    NewsItem,
    NewsItemImage,
    NewsItemTag,
    NewsItemUserReactionEvent
)
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Seed the database with realistic news items'

    def handle(self, *args, **kwargs):
        User.objects.create_superuser(
            username='zavod_it',
            email='zavod_it@gmail.com',
            password='Zavod2025'
        )

        User.objects.create_user(
            username='lusayo',
            email='lusayo@gmail.com',
            password='Lusayo1234'
        )

        titles = [
            "Breaking News: Major Event Happens",
            "Local Sports Team Wins Championship",
            "New Technology Breakthrough Announced",
            "Health Experts Share Tips for Wellness",
            "Travel Destinations to Explore in 2025",
            "New Study Reveals Surprising Facts About Sleep",
            "Economic Growth Expected in the Coming Year",
            "Celebrity Couple Announces Engagement",
            "New Restaurant Opens Downtown",
            "City Council Approves New Park Development",
            "Innovative Startups to Watch in 2025",
            "Local Artist's Work Featured in National Gallery",
            "Groundbreaking Research on Climate Change Released",
            "New App Aims to Simplify Personal Finance",
            "Fitness Trends to Follow This Year",
            "Upcoming Music Festival Promises Big Names",
            "Tech Giants Compete for Market Share in AI",
            "Fashion Week Highlights Emerging Designers",
            "New Book Explores Historical Events in Depth",
            "Local School Wins National Award for Excellence",
            "Virtual Reality: The Future of Gaming?",
            "How to Stay Healthy During Winter Months",
            "The Rise of Remote Work: Pros and Cons",
            "Exploring the Benefits of Meditation and Mindfulness",
            "The Impact of Social Media on Mental Health",
            "Traveling on a Budget: Tips and Tricks",
            "Understanding Cryptocurrency: A Beginner's Guide",
            "The Importance of Sustainable Living Practices",
            "How to Cultivate a Positive Work Environment",
            "Innovations in Renewable Energy Sources",
            "The Evolution of E-Commerce: What's Next?",
            "How to Prepare for Natural Disasters",
            "The Role of Education in Economic Development",
        ]

        tags = [
            "Breaking",
            "Sports",
            "Technology",
            "Health",
            "Travel",
            "Finance",
            "Art",
            "Environment",
            "Education",
            "Lifestyle"
        ]

        tag_objects = {
            tag: NewsItemTag.objects.create(
                label=tag,
                image='/tags/default.webp'
            )
            for tag in tags
        }

        for i in range(1000):
            title = random.choice(titles)

            news_item = NewsItem.objects.create(
                    title=f"{i} - {title}",
                    text=(
                        f"This is a detailed article about "
                        f"{title.lower()}. It discusses various "
                        "aspects related to the topic."
                    ),
                    main_image='/news_items/default.webp'
            )

            for j in range(random.randint(1, 3)):
                NewsItemImage.objects.create(
                    news_item=news_item,
                    image='/news_items/default_extra.webp'
                )

            selected_tags = random.sample(
                list(tag_objects.values()),
                k=random.randint(1, len(tag_objects))
            )
            for tag_object in selected_tags:
                tag_object.news_item.add(news_item)

            for user in User.objects.all():
                reaction_type = random.choice(['like', 'dislike'])
                NewsItemUserReactionEvent.objects.create(
                    event_type=reaction_type,
                    user=user,
                    news_item=news_item
                )

        self.stdout.write(
            self.style.SUCCESS(
                'Successfully seeded the database with 1000 news items.'
            )
        )
